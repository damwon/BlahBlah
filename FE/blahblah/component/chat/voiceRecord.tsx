/* eslint-disable */
import React, { useState, useCallback } from "react";
import { Icon } from "semantic-ui-react";

export default function VoiceRecordIcon() {
  return (
    <Icon
      name="microphone"
      link
      onClick={() => {
        alert("녹음버튼 눌림");
      }}
    />
  );
}
