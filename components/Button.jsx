//create a button function component. Export it so it can be used in other files
export default function Button({ button, setBtn }) {
  return (
    <button
      className="px-3.5 py-2.5 text-white bg-purple-800 rounded-xl"
      onClick={() => {
        setBtn(button);
        // FileMaker.PerformScript("Run Script", text);
      }}
    >
      {button.btnText}
    </button>
  );
}
