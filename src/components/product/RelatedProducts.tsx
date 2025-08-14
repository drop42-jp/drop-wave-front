
import ProductCard from './ProductCard';

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew: boolean;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;