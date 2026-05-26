//create a button function component. Export it so it can be used in other files
export default function Button({ button, setBtn, isActive }) {
  return (
    <button
      className={`px-3.5 py-2.5 text-white rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-purple-600 ring-2 ring-purple-300 shadow-lg scale-105"
          : "bg-purple-800 hover:bg-purple-700"
      }`}
      onClick={() => {
        setBtn(button);
      }}
    >
      {button.btnText}
    </button>
  );
}
