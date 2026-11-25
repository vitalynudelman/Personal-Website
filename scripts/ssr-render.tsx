// Renders the real page components to HTML without a browser.
// Evidence for content parity only; it says nothing about layout or appearance.
// Neither page uses router hooks, so no router context is needed.
import { renderToStaticMarkup } from 'react-dom/server';
import Home from '../src/pages/Home';
import ContactPage from '../src/pages/Contact';

console.log(renderToStaticMarkup(<Home />) + renderToStaticMarkup(<ContactPage />));
