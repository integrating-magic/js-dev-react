//create a button function component. Export it so it can be used in other files
export default function Button({ text, setBtn }) {
  return (
    <button
      className="px-2 m-5 text-white bg-purple-800 rounded-xl"
      onClick={() => {
        setBtn(text);
        // FileMaker.PerformScript("Run Script", text);
      }}
    >
      {text}
    </button>
  );
}
