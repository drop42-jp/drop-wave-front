
import ProductCard from '../product/ProductCard';
import { Product } from '../../types';

const ProductsPage = () => {
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Cotton Tee',
      price: 28,
      image: '/lovable-uploads/a0af2fd1-53d3-4482-9b34-5dd7a03c12df.png',
      description: 'Soft premium cotton t-shirt with comfortable fit',
      isNew: true,
    },
    {
      id: '2',
      name: 'Stainless Steel Water Bottle',
      price: 22,
      image: '/lovable-uploads/09b11c0a-f123-4891-be66-b516558a9817.png',
      description: 'Durable stainless steel water bottle for daily hydration',
      isNew: false,
    },
    {
      id: '3',
      name: 'Vintage Poster Print',
      price: 15,
      image: '/lovable-uploads/a5baf921-1082-4125-8cc8-ccb252062a6b.png',
      description: 'Classic vintage-style poster for wall decoration',
      isNew: true,
    },
    {
      id: '4',
      name: 'Canvas Wall Art',
      price: 35,
      image: '/lovable-uploads/b0450473-ea7d-4288-a913-596c20960ef6.png',
      description: 'Beautiful canvas print for modern home decor',
      isNew: false,
    },
    {
      id: '5',
      name: 'Classic Logo Tee',
      price: 25,
      image: '/lovable-uploads/17b70eb0-ff9a-4af8-80ad-5fdd4ab6d334.png',
      description: 'Timeless design t-shirt with classic logo',
      isNew: false,
    },
    {
      id: '6',
      name: 'Coffee Mug Set',
      price: 18,
      image: '/lovable-uploads/d9f0f475-294a-4fe4-83c0-fd9f0e3d324b.png',
      description: 'Ceramic coffee mug perfect for morning coffee',
      isNew: true,
    },
    {
      id: '7',
      name: 'Comfort Hoodie',
      price: 42,
      image: '/lovable-uploads/a0af2fd1-53d3-4482-9b34-5dd7a03c12df.png',
      description: 'Cozy pullover hoodie for casual comfort',
      isNew: true,
    },
    {
      id: '8',
      name: 'Travel Tumbler',
      price: 24,
      image: '/lovable-uploads/09b11c0a-f123-4891-be66-b516558a9817.png',
      description: 'Insulated tumbler perfect for hot and cold drinks',
      isNew: false,
    },
    {
      id: '9',
      name: 'Art Print Collection',
      price: 20,
      image: '/lovable-uploads/b0450473-ea7d-4288-a913-596c20960ef6.png',
      description: 'Curated art print collection for your space',
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">All Products</h1>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
