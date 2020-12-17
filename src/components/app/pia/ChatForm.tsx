import * as React from "react";
import ReactDOM from 'react-dom';
import { ChatProps, JSONData } from '~/src/components/app/types';
import * as Survey from 'surveyjs-react';

export interface ChatFormProps extends ChatProps {
  type: "form",
  items: JSONData
}

export const ChatForm = (props: ChatFormProps) => {

  const sendDataToServer = (survey: Survey.SurveyModel) => {
    props.continueCallback(survey.data, props.permit);
  };

  return (
    <Survey.Survey
      showCompletedPage={true}
      json={props.items}
      onComplete={sendDataToServer} />
  );
}
