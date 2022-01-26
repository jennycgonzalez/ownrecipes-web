import { useEffect } from 'react';

import { AnyComponent } from '../../types/Types';
import ErrorBoundary from './ErrorBoundary';

/** {@link PageTitleFixer} Props. */
interface IPageWrapperProps {
  /** Page title. */
  title?:   string;
  /** Page component to render. */
  children: AnyComponent;
}

/**
 * HOC to properly set the browser title to assure accessibilty.
 */
 const PageWrapper: React.FC<IPageWrapperProps> = (props: IPageWrapperProps) => {
  const { title } = props;

  useEffect(() => {
    // ARIA: Titles should contain the application name and page title.
    document.title = (`${title != null && title.length > 0 ? `${title} | ` : ''}OpenEats`);
  }, [title]);

  return (
    <ErrorBoundary verbose printStack>
      {props.children}
    </ErrorBoundary>
  );
};

export default PageWrapper;
