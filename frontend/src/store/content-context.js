import { createContext, useState } from "react";

const ContentContext = createContext({
  content: "",
  changeContent: () => {},
});

export const ContentContextProvider = (props) => {
  const [content, setContent] = useState("");

  const contentChangeHandler = (content) => {
    setContent(content);
  };

  const contextValue = {
    content: content,
    changeContent: contentChangeHandler,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {props.children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
