import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ArrowRightIcon } from 'lucide-react'

export default function NewsCard({news}:any) {
  return (
            <Card className="flex flex-col h-full">
              <CardHeader>
                <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="flex justify-between items-center mt-4">
                  <Badge variant="secondary">{news.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {news.date}
                  </div>
                </div>
                <CardTitle className="mt-2">{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{news.description}</CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline" className="w-full">
                  Xem thêm
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
  )
}

