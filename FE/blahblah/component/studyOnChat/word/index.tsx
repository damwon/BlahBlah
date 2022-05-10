import { useState } from "react";
import WordFolderLstChat from "./folderLst";
import WordLstChat from "./wordLst";
export default function Test() {
  const [TF, setTF] = useState(true);
  const [id, setId] = useState("");
  const handleTF = (data: any, dataId: any) => {
    setTF(data);
    setId(dataId);
  };
  if (TF) {
    return <WordFolderLstChat handleTF={handleTF} />;
  } else {
    return <WordLstChat wordId={id} handleTF={handleTF} />;
  }
}
