import { createContext } from "react";

const ContentContext = createContext({
  content: null,
  changeContent: () => {}
});

export const ContentContextProvider = (props) => {

  const initialContent = 'Home'
  const [content, setContent] = useState(initialContent)

  const contentChangeHandler = () => {
    setContent('something')
  }


  return <ContentContext.Provider value={} >
    {props.children}
  </ContentContext.Provider>
}
