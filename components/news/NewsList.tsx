import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';
import NewsCard from './NewsCard';
import Container from '../layout/Container';

const newsItems = [
  {
    title: 'The Rise of AI in IT Support',
    description:
      'Explore how artificial intelligence is revolutionizing the IT support industry, improving response times and problem-solving capabilities.',
    date: '2023-05-15',
    category: 'Technology Trends',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    title: '5 Essential Cybersecurity Practices for Small Businesses',
    description:
      'Learn the key strategies to protect your small business from cyber threats in an increasingly digital world.',
    date: '2023-06-02',
    category: 'Cybersecurity',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    title: 'The Future of Remote IT Support',
    description:
      'Discover how remote IT support is evolving and what it means for businesses in a post-pandemic world.',
    date: '2023-06-20',
    category: 'Industry Insights',
    image: '/placeholder.svg?height=200&width=300',
  },
];

export default function NewsList() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Tin tức mới nhất
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Cập nhật tin tức và xu hướng công nghệ mới nhất.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((news, index) => (
            <div key={index}>
              <NewsCard news={news} />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg">Xem thêm</Button>
        </div>
      </Container>
    </section>
  );
}
