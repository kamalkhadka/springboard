const INITIAL_OBJECT = { num1: 0, num2: 0 };
export default function nums(state=INITIAL_OBJECT, action) {
    switch (action.type) {
        case "CHANGE_NUM":
          return { ...state, [action.num]: action.value };
        default:
          return state;
      }
}
