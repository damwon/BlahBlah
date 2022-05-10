import { useState } from "react";
import TA from "../../component/tA";
import TB from "../../component/tB";
export default function Test() {
  const [TF, setTF] = useState(true);
  const [id, setId] = useState("");
  const handleTF = (data: any, dataId: any) => {
    setTF(data);
    setId(dataId);
    console.log(data);
    console.log(dataId);
  };
  if (TF) {
    return <TA handleTF={handleTF} />;
  } else {
    return <TB wordId={id} handleTF={handleTF} />;
  }
}
