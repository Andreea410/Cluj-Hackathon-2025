
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const ProductRecommendations = ({ skinAnalysis, onContinue }) => {
  const getRecommendations = () => {
    const { skinType, breakoutFrequency, skinConcerns } = skinAnalysis;
    
    let products = [];
    
    // Base routine for all skin types
    products.push({
      name: 'Gentle Cleanser',
      type: 'Cleanser',
      price: '$24',
      rating: 4.8,
      description: 'A mild, non-stripping cleanser suitable for daily use',
      morning: true,
      night: true
    });
    
    // Skin type specific recommendations
    if (skinType === 'oily' || breakoutFrequency === 'frequently') {
      products.push({
        name: 'Salicylic Acid Treatment',
        type: 'Treatment',
        price: '$32',
        rating: 4.6,
        description: 'Helps unclog pores and reduce breakouts',
        morning: false,
        night: true
      });
    }
    
    if (skinType === 'dry' || skinConcerns === 'dryness') {
      products.push({
        name: 'Hydrating Serum',
        type: 'Serum',
        price: '$45',
        rating: 4.9,
        description: 'Intense hydration with hyaluronic acid',
        morning: true,
        night: true
      });
    }
    
    if (skinConcerns === 'aging') {
      products.push({
        name: 'Retinol Serum',
        type: 'Treatment',
        price: '$58',
        rating: 4.7,
        description: 'Anti-aging formula to reduce fine lines',
        morning: false,
        night: true
      });
    }
    
    if (skinConcerns === 'hyperpigmentation') {
      products.push({
        name: 'Vitamin C Serum',
        type: 'Serum',
        price: '$38',
        rating: 4.8,
        description: 'Brightening serum for even skin tone',
        morning: true,
        night: false
      });
    }
    
    // Universal products
    products.push({
      name: 'Moisturizer',
      type: 'Moisturizer',
      price: '$28',
      rating: 4.7,
      description: 'Daily hydration for healthy skin barrier',
      morning: true,
      night: true
    });
    
    products.push({
      name: 'SPF 30 Sunscreen',
      type: 'Sunscreen',
      price: '$22',
      rating: 4.9,
      description: 'Broad spectrum protection for daily use',
      morning: true,
      night: false
    });
    
    return products;
  };

  const recommendations = getRecommendations();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Your Personalized Recommendations
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Based on your skin analysis, we've curated the perfect products for your skincare journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {recommendations.map((product, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {product.type}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-purple-600">{product.price}</span>
                <div className="flex gap-2">
                  {product.morning && (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                      Morning
                    </Badge>
                  )}
                  {product.night && (
                    <Badge variant="outline" className="text-indigo-600 border-indigo-300">
                      Night
                    </Badge>
                  )}
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                Add to Routine
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={onContinue}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg"
        >
          Start My Skincare Routine
        </Button>
      </div>
    </div>
  );
};

export default ProductRecommendations;
