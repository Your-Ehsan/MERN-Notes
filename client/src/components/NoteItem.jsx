import PropTypes from "prop-types";
import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
const NoteItem = ({ _id, title, description, tag, createdAt, updatedAt }) => {
  const { setEditNote, setShowEditNote, _Notes, deleteNote } =
    useContext(NotesContext);

  return (
    <Card className="w-full max-w-md m-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"edit"}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditNote(_Notes.find((_note) => _note._id === _id));
                      setShowEditNote(true);
                    }}
                  >
                    <EditIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteNote(_id)}
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent>
        <Badge className="my-2" variant="secondary">
          {tag}
        </Badge>
        <p className="text-muted-foreground line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="grid">
          <div>Created At: {new Date(createdAt).toDateString()}</div>
          <div>Updated At: {new Date(updatedAt).toDateString()}</div>
        </div>
        <Link to={_id}>
          <Button>
            <EyeIcon size={20} /> View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

NoteItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tag: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
};

export default NoteItem;
