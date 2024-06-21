import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function BoardCard() {
  return (
    <>
      <Card className="mt-2 border border-gray-700/70">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Create a new project in one click.</p>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </>
  )
}
