import Button from "components/atoms/button";
import Checkbox from "components/atoms/checkbox";

const Cta = () => (
  <>
    <Button type="button" onClick={() => alert("you clicked me")}>
      default button
    </Button>

    <Checkbox label='foobar' id='foo' />
  </>
);

export default Cta;
