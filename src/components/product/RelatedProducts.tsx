
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
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
