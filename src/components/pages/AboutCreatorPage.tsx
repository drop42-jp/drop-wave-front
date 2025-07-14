
import { Instagram, Twitter, Youtube, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutCreatorPage = () => {
  const socialLinks = [
    { platform: 'Instagram', url: '#', icon: Instagram, followers: '24.5K' },
    { platform: 'Twitter', url: '#', icon: Twitter, followers: '12.8K' },
    { platform: 'YouTube', url: '#', icon: Youtube, followers: '8.2K' },
  ];

  const featuredDrops = [
    {
      id: '1',
      title: 'Spring Awakening',
      status: 'coming-soon',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Summer Vibes',
      status: 'live',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-black rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-white text-4xl font-bold">CT</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Charlotte Todd</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Digital artist and designer creating unique, limited-edition pieces that blend modern aesthetics with timeless appeal.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                >
                  <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">{social.platform}</div>
                    <div className="text-xs text-gray-500">{social.followers}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I'm a digital artist fascinated by the intersection of technology and human emotion. 
                My work explores themes of connection, growth, and the beauty found in everyday moments.
              </p>
              <p>
                Each piece I create is designed to spark conversation and bring people together. 
                From limited-edition drops to evergreen collections, every design carries a piece of my journey.
              </p>
              <p>
                When I'm not designing, you can find me exploring new cities, reading philosophy, 
                or experimenting with new creative mediums. I believe that art should be accessible, 
                meaningful, and a reflection of our shared human experience.
              </p>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b2a0c6f9?w=400&h=600&fit=crop"
                alt="Charlotte Todd"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Design Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Intentional</h3>
              <p className="text-sm text-gray-600">Every element serves a purpose and tells part of the story.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Timeless</h3>
              <p className="text-sm text-gray-600">Designs that transcend trends and remain relevant.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Connected</h3>
              <p className="text-sm text-gray-600">Art that brings people together and sparks meaningful conversations.</p>
            </div>
          </div>
        </div>

        {/* Featured Work */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Drops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredDrops.map((drop) => (
              <Link
                key={drop.id}
                to={`/drop/${drop.id}`}
                className="group relative bg-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square">
                  <img
                    src={drop.image}
                    alt={drop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{drop.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      drop.status === 'live' ? 'bg-green-500' : 'bg-orange-500'
                    }`}>
                      {drop.status === 'live' ? 'Live Now' : 'Coming Soon'}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-black text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Have a question about my work or want to collaborate? I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@charlottetodd.com"
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </a>
            <Link
              to="/"
              className="border border-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors"
            >
              View Latest Drops
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCreatorPage;
