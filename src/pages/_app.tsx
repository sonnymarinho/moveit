import GlobalStyles from '../styles/global';
import { ChallangesProvider} from '../hooks/useChallanges';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ChallangesProvider>
        <Component {...pageProps} />
      </ChallangesProvider>
    </>
  )
}

export default MyApp
