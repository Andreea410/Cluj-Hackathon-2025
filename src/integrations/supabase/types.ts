export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          permissions: Json
          user_id: string | null
        }
        Insert: {
          id?: string
          permissions?: Json
          user_id?: string | null
        }
        Update: {
          id?: string
          permissions?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_logs: {
        Row: {
          id: string
          message: Json
          role: string
          user_id: string | null
        }
        Insert: {
          id?: string
          message: Json
          role: string
          user_id?: string | null
        }
        Update: {
          id?: string
          message?: Json
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      answer_options: {
        Row: {
          id: string
          question_id: string | null
          value: string
        }
        Insert: {
          id?: string
          question_id?: string | null
          value: string
        }
        Update: {
          id?: string
          question_id?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      benefits: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          id: string
          logo_url: string | null
          name: string
          website: string | null
        }
        Insert: {
          id?: string
          logo_url?: string | null
          name: string
          website?: string | null
        }
        Update: {
          id?: string
          logo_url?: string | null
          name?: string
          website?: string | null
        }
        Relationships: []
      }
      ingredient_benefits: {
        Row: {
          benefit_id: string | null
          id: string
          ingredient_id: string | null
        }
        Insert: {
          benefit_id?: string | null
          id?: string
          ingredient_id?: string | null
        }
        Update: {
          benefit_id?: string | null
          id?: string
          ingredient_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_benefits_benefit_id_fkey"
            columns: ["benefit_id"]
            isOneToOne: false
            referencedRelation: "benefits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_benefits_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_side_effects: {
        Row: {
          id: string
          ingredient_id: string | null
          side_effect_id: string | null
        }
        Insert: {
          id?: string
          ingredient_id?: string | null
          side_effect_id?: string | null
        }
        Update: {
          id?: string
          ingredient_id?: string | null
          side_effect_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_side_effects_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_side_effects_side_effect_id_fkey"
            columns: ["side_effect_id"]
            isOneToOne: false
            referencedRelation: "side_effects"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          id: string
          order_id: string | null
          paid_at: string
          stripe_charge_id: string | null
        }
        Insert: {
          id?: string
          order_id?: string | null
          paid_at: string
          stripe_charge_id?: string | null
        }
        Update: {
          id?: string
          order_id?: string | null
          paid_at?: string
          stripe_charge_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_analyses: {
        Row: {
          analyzed_at: string
          id: string
          metrics: Json
          photo_upload_id: string | null
        }
        Insert: {
          analyzed_at?: string
          id?: string
          metrics: Json
          photo_upload_id?: string | null
        }
        Update: {
          analyzed_at?: string
          id?: string
          metrics?: Json
          photo_upload_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photo_analyses_photo_upload_id_fkey"
            columns: ["photo_upload_id"]
            isOneToOne: false
            referencedRelation: "photo_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_uploads: {
        Row: {
          auth_user_id: string | null
          created_at: string
          file_url: string
          id: string
          upload_date: string
          user_id: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          file_url: string
          id?: string
          upload_date?: string
          user_id?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          file_url?: string
          id?: string
          upload_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photo_uploads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          features: Json
          id: string
          name: string
          price_per_month: number
        }
        Insert: {
          features: Json
          id?: string
          name: string
          price_per_month?: number
        }
        Update: {
          features?: Json
          id?: string
          name?: string
          price_per_month?: number
        }
        Relationships: []
      }
      point_transactions: {
        Row: {
          auth_user_id: string | null
          id: string
          points: number
          user_id: string | null
        }
        Insert: {
          auth_user_id?: string | null
          id?: string
          points: number
          user_id?: string | null
        }
        Update: {
          auth_user_id?: string | null
          id?: string
          points?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "point_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_ingredients: {
        Row: {
          id: string
          ingredient_id: string | null
          product_id: string | null
        }
        Insert: {
          id?: string
          ingredient_id?: string | null
          product_id?: string | null
        }
        Update: {
          id?: string
          ingredient_id?: string | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_ingredients_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: string | null
          description: string | null
          id: string
          name: string
          photo_url: string | null
          price: number
          stock: number | null
        }
        Insert: {
          brand_id?: string | null
          description?: string | null
          id?: string
          name: string
          photo_url?: string | null
          price: number
          stock?: number | null
        }
        Update: {
          brand_id?: string | null
          description?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          price?: number
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          field_key: string
          id: string
          text: string
        }
        Insert: {
          field_key: string
          id?: string
          text: string
        }
        Update: {
          field_key?: string
          id?: string
          text?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          description: string | null
          id: string
          name: string
          threshold_points: number
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          threshold_points: number
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          threshold_points?: number
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: string
          name: string
          permissions: Json
        }
        Insert: {
          id?: string
          name: string
          permissions?: Json
        }
        Update: {
          id?: string
          name?: string
          permissions?: Json
        }
        Relationships: []
      }
      routine_adjustments: {
        Row: {
          actions: Json
          auth_user_id: string | null
          id: string
          photo_analysis_id: string | null
          user_id: string | null
        }
        Insert: {
          actions: Json
          auth_user_id?: string | null
          id?: string
          photo_analysis_id?: string | null
          user_id?: string | null
        }
        Update: {
          actions?: Json
          auth_user_id?: string | null
          id?: string
          photo_analysis_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routine_adjustments_photo_analysis_id_fkey"
            columns: ["photo_analysis_id"]
            isOneToOne: false
            referencedRelation: "photo_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routine_adjustments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_step_products: {
        Row: {
          id: string
          product_id: string | null
          routine_step_id: string | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          routine_step_id?: string | null
        }
        Update: {
          id?: string
          product_id?: string | null
          routine_step_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routine_step_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routine_step_products_routine_step_id_fkey"
            columns: ["routine_step_id"]
            isOneToOne: false
            referencedRelation: "routine_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_steps: {
        Row: {
          description: string | null
          id: string
          name: string
          routine_template_id: string | null
          step_number: number
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          routine_template_id?: string | null
          step_number: number
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          routine_template_id?: string | null
          step_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "routine_steps_routine_template_id_fkey"
            columns: ["routine_template_id"]
            isOneToOne: false
            referencedRelation: "routine_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_templates: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      side_effects: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          auth_user_id: string | null
          end_date: string | null
          id: string
          plan_id: string | null
          start_date: string
          status: string
          user_id: string | null
        }
        Insert: {
          auth_user_id?: string | null
          end_date?: string | null
          id?: string
          plan_id?: string | null
          start_date?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          auth_user_id?: string | null
          end_date?: string | null
          id?: string
          plan_id?: string | null
          start_date?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_responses: {
        Row: {
          auth_user_id: string | null
          id: string
          option_id: string | null
          question_id: string | null
          user_id: string | null
        }
        Insert: {
          auth_user_id?: string | null
          id?: string
          option_id?: string | null
          question_id?: string | null
          user_id?: string | null
        }
        Update: {
          auth_user_id?: string | null
          id?: string
          option_id?: string | null
          question_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_responses_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "answer_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_rewards: {
        Row: {
          auth_user_id: string | null
          claimed_at: string
          id: string
          reward_id: string | null
          user_id: string | null
        }
        Insert: {
          auth_user_id?: string | null
          claimed_at?: string
          id?: string
          reward_id?: string | null
          user_id?: string | null
        }
        Update: {
          auth_user_id?: string | null
          claimed_at?: string
          id?: string
          reward_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_rewards_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_routine_logs: {
        Row: {
          auth_user_id: string | null
          completed_steps: number
          id: string
          log_date: string
          user_routine_id: string | null
        }
        Insert: {
          auth_user_id?: string | null
          completed_steps?: number
          id?: string
          log_date: string
          user_routine_id?: string | null
        }
        Update: {
          auth_user_id?: string | null
          completed_steps?: number
          id?: string
          log_date?: string
          user_routine_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_routine_logs_user_routine_id_fkey"
            columns: ["user_routine_id"]
            isOneToOne: false
            referencedRelation: "user_routines"
            referencedColumns: ["id"]
          },
        ]
      }
      user_routines: {
        Row: {
          assigned_at: string
          auth_user_id: string | null
          id: string
          routine_template_id: string | null
          user_id: string | null
        }
        Insert: {
          assigned_at?: string
          auth_user_id?: string | null
          id?: string
          routine_template_id?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_at?: string
          auth_user_id?: string | null
          id?: string
          routine_template_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_routines_routine_template_id_fkey"
            columns: ["routine_template_id"]
            isOneToOne: false
            referencedRelation: "routine_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_routines_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          hashed_password: string
          id: string
          role_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          hashed_password: string
          id?: string
          role_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          hashed_password?: string
          id?: string
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
