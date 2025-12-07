import Link from "next/link";

import { Dean } from "@/data/governance/deans";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DeansGrid({ deans }: { deans: Dean[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {deans.map((dean) => (
        <Card key={dean.role} className="rounded-sm border-stone-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {dean.name || dean.role}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge className="rounded-sm bg-primary text-white">
                    {dean.role}
                  </Badge>
                  {dean.placeholder && (
                    <Badge variant="outline" className="rounded-sm text-xs">
                      To be updated
                    </Badge>
                  )}
                </div>
              </div>
              {dean.email ? (
                <Link
                  href={`mailto:${dean.email}`}
                  className="text-primary text-sm font-semibold hover:underline underline-offset-4"
                >
                  Email
                </Link>
              ) : null}
            </div>
            {dean.focus ? (
              <CardDescription className="text-sm text-gray-600">
                {dean.focus}
              </CardDescription>
            ) : null}
          </CardHeader>
          {dean.phone ? (
            <CardContent className="text-sm text-gray-700 leading-relaxed">
              {dean.phone}
            </CardContent>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
