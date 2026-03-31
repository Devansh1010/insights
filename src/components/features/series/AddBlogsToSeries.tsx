import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const AddBlogsToSeries = () => {
  
  return (
    <div>
      <Dialog>
        <DialogTrigger> Add Articles </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please Select the Articles</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddBlogsToSeries