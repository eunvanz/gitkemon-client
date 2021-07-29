import compose from "compose-function";
import BaseLayoutContainer from "../components/BaseLayout";
import withAuth from "./withAuth";

/**
 * BaseLayoutContainer로 래핑된 컴포넌트를 리턴
 * 서버사이드 렌더링 시 withAuthServerSideProps 와 함께 쓰여야 함
 * @param WrappedComponent
 * @returns BaseLayoutContainer로 래핑된 컴포넌트
 */
const withBaseLayout = (WrappedComponent: React.FC<any>) => {
  const Wrapper = (props: any) => {
    return (
      <BaseLayoutContainer user={props.user}>
        <WrappedComponent {...props} />
      </BaseLayoutContainer>
    );
  };

  return Wrapper;
};

export default compose(withBaseLayout, withAuth);
