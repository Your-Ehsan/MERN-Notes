import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useNotesContext } from "@/hooks/useNotesContext";
import { CalendarIcon, EditIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function NotePage() {
  const params = useParams();
  const { setEditNote, setShowEditNote, deleteNote, getNote } =
    useNotesContext();

  const [note, setNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
    updatedAt: "",
  });
  useEffect(() => {
    (async () => {
      const note = await getNote(params.id);
      setNote(note.note);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{note.title}</h1>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {note.tag}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-6 whitespace-pre-wrap">{note.description}</div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Link to={"/edit"}>
            <Button
              variant="ghost"
              onClick={() => {
                setEditNote(note);
                setShowEditNote(true);
              }}
            >
              <EditIcon className="h-4 w-4" />
              <span className="">Edit</span>
            </Button>
          </Link>

          <Button variant="destructive" onClick={() => deleteNote(params.id)}>
            <TrashIcon className="h-4 w-4" />
            <span className="">Delete</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
