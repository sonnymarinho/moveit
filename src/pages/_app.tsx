import GlobalStyles from '../styles/global';
import { ChallangesProvider} from '../hooks/useChallanges';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
