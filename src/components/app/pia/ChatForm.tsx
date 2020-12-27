import * as React from "react";
import { ChatProps, JSONData } from '~/src/components/app/types';
import * as Survey from 'survey-react';

export interface ChatFormProps extends ChatProps {
  type: "form",
  elements: JSONData
}

export const ChatForm = (props: ChatFormProps) => {

  const sendDataToServer = (survey: Survey.SurveyModel) => {
    props.continueCallback(survey.data);
  };

  const result = (
    <Survey.Survey
      showCompletedPage={true}
      json={props.elements}
      onComplete={sendDataToServer} />
  );

  return result;
}
