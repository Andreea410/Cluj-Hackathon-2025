# PowerShell script to fix dependency injection issues

# Function to fix a service file
function Fix-ServiceFile {
    param (
        [string]$servicePath
    )
    
    $content = Get-Content $servicePath -Raw
    
    # Replace interface imports with concrete repository imports
    $content = $content -replace 'import \{ I(\w+)Repository \} from .*', 'import { $1Repository } from "../repositories/$1.repository";'
    
    # Replace interface types with concrete repository types
    $content = $content -replace 'private readonly \w+Repository: I(\w+)Repository', 'private readonly $1Repository: $1Repository'
    
    Set-Content -Path $servicePath -Value $content
    Write-Host "Fixed service file: $servicePath"
}

# Function to fix a module file
function Fix-ModuleFile {
    param (
        [string]$modulePath
    )
    
    $content = Get-Content $modulePath -Raw
    
    # Add SupabaseClient provider if not present
    if (-not ($content -match 'SupabaseClient')) {
        $supabaseProvider = @"

    {
      provide: SupabaseClient,
      useFactory: () => {
        return new SupabaseClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_KEY!
        );
      },
    },
"@
        
        $content = $content -replace 'providers: \[([^\]]+)\]', "providers: [$1$supabaseProvider"
        $content = $content -replace 'import \{ Module \} from .*', "import { Module } from '@nestjs/common';`nimport { SupabaseClient } from '@supabase/supabase-js';"
        
        Set-Content -Path $modulePath -Value $content
        Write-Host "Fixed module file: $modulePath"
    }
}

# Get all service files
$serviceFiles = Get-ChildItem -Path "src/services" -Filter "*.service.ts" -Recurse

# Get all module files
$moduleFiles = Get-ChildItem -Path "src/modules" -Filter "*.module.ts" -Recurse

# Fix all service files
foreach ($file in $serviceFiles) {
    Fix-ServiceFile -servicePath $file.FullName
}

# Fix all module files
foreach ($file in $moduleFiles) {
    Fix-ModuleFile -modulePath $file.FullName
}

Write-Host "Dependency injection fixes completed!" 