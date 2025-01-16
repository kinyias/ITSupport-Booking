import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function SupportCategories() {
    return (
        <Card className="col-span-4 md:col-span-3">
        <CardHeader>
          <CardTitle>Dịch vụ đã hỗ trợ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sửa chữa & nâng cấp</span>
                  <span className="text-sm font-bold">35%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: "35%" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cài đặt phần mềm</span>
                  <span className="text-sm font-bold">28%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: "28%" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Lắp đặt Camera</span>
                  <span className="text-sm font-bold">22%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: "22%" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Khác</span>
                  <span className="text-sm font-bold">15%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: "15%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }