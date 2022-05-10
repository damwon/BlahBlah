import { useState } from "react";
import NoteFolderLstChat from "./folderLst";
import NoteLstChat from "./noteLst";
import EditOnChat from "./editOnChat";
export default function NoteOnChat() {
  const [TF, setTF] = useState(1);
  const [id, setId] = useState("");
  const handleTF = (data: any, dataId: any) => {
    setTF(data);
    setId(dataId);
    console.log(data);
    console.log(dataId);
  };
  if (TF === 1) {
    return <NoteFolderLstChat handleTF={handleTF} />;
  } else if (TF === 2) {
    return <NoteLstChat noteId={id} handleTF={handleTF} />;
  } else {
    return <EditOnChat noteId={id} handleTF={handleTF} />;
  }
}
