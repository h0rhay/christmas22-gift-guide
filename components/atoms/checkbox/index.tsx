import styled from "styled-components";

type ICheckbox = {
  label: string;
  id: string;
};

const CheckboxContainer = styled.div`
  /* The container */
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0.3rem;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.currentColorGroup.interface};
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: ${({ theme }) => theme.currentColorGroup.interface};
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  /* Style error message */
  .validation-message,
  .error {
    display: block;
    margin-bottom: 2rem;
    font-size: 1rem;
    color: firebrick;
    height: 1rem;
    width: 100%;
  }
`;

const Checkbox = ({ label, id }: ICheckbox) => {
  return (
    <CheckboxContainer>
      <label className="container" htmlFor={id}>
        <input id={id} type="checkbox" />
        <span className="checkmark"></span>
        {label}
      </label>
    </CheckboxContainer>
  );
};

export default Checkbox;
