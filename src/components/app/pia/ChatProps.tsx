export interface ChatProps {
  id: string,
  type: string,
  callback: null | ((data: JSON, permit: JSON) => void);
}