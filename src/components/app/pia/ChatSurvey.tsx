import * as React from "react";
import { ChatProps, JSONData } from '~/src/components/app/types';
import * as Survey from 'survey-react';

export interface ChatSurveyProps extends ChatProps {
  type: "survey",
  elements: JSONData
}

export const ChatSurvey = (props: ChatSurveyProps) => {

  const sendDataToServer = (survey: Survey.SurveyModel) => {
    props.continueCallback(survey.data);
  };

  const result = (
    <Survey.Survey
      id={props.id}
      showCompletedPage={true}
      json={props.elements}
      onComplete={sendDataToServer} />
  );

  return result;
}
