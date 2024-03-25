interface Pack {
  id: string;
  title: string;
  subscription: {monthly: number; yearly: number};
}
interface Addon {
  id: string;
  title: string;
  description: string;
  subscription: {monthly: number; yearly: number};
}
interface UserInfo {
  name: string;
  email: string;
  phone: string;
}
interface CartInfo {
  packs: Pack[];
  addOns: Addon[];
}
export interface InitialValue {
  userInfo: UserInfo;
  pack: number;
  addOns: number[];
  isYearly: boolean;
  cartInfo: CartInfo;
}
export interface Action {
  type: string;
  payload: UserInfo | boolean | number | number[];
}

export const cartInfo: CartInfo = {
  packs: [
    {
      id: "arcade",
      title: "Arcade",
      subscription: {monthly: 9, yearly: 90},
    },
    {
      id: "advanced",
      title: "Advanced",
      subscription: {monthly: 12, yearly: 120},
    },
    {
      id: "pro",
      title: "Pro",
      subscription: {monthly: 15, yearly: 150},
    },
  ],
  addOns: [
    {
      id: "onlineService",
      title: "Online service",
      description: "Access to multiplayer games",
      subscription: {monthly: 1, yearly: 10},
    },
    {
      id: "largeStorage",
      title: "Large storage",
      description: "Extra 1TB cloud save",
      subscription: {monthly: 2, yearly: 20},
    },
    {
      id: "customizableProfile",
      title: "Customizable profile",
      description: "Custom theme on your profile",
      subscription: {monthly: 2, yearly: 20},
    },
  ],
};
export const initialValue: InitialValue = {
  userInfo: {
    name: "",
    phone: "",
    email: "",
  },
  pack: 1,
  addOns: [],
  isYearly: false,
  cartInfo,
};
export const ACTIONS = {
  updateUserInfo: "Update user info",
  selectPack: "Select pack",
  addAddOn: "Add add ons",
  removeAddOn: "Remove add ons",
  selectBillType: "Select bill type",
};

export function formReducer(state: InitialValue, action: Action): InitialValue {
  switch (action.type) {
    case ACTIONS.updateUserInfo: {
      return {...state, userInfo: action.payload as UserInfo};
    }
    case ACTIONS.selectPack: {
      return {...state, pack: action.payload as number};
    }
    case ACTIONS.addAddOn: {
      return {...state, addOns: action.payload as number[]};
    }
    case ACTIONS.removeAddOn: {
      return {
        ...state,
        addOns: state.addOns.filter((_, index) => index !== (action.payload as number)),
      };
    }
    case ACTIONS.selectBillType: {
      return {...state, isYearly: action.payload as boolean};
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}
const updateUserInfo = (payload: UserInfo) => {
  return {
    type: ACTIONS.updateUserInfo,
    payload,
  };
};
const selectPack = (payload: number) => {
  return {
    type: ACTIONS.selectPack,
    payload,
  };
};
const addAddOn = (payload: number[]) => {
  return {
    type: ACTIONS.addAddOn,
    payload,
  };
};
const removeAddOn = (payload: Addon["id"]) => {
  return {
    type: ACTIONS.removeAddOn,
    payload,
  };
};
const selectBillType = (payload: boolean) => {
  return {
    type: ACTIONS.selectBillType,
    payload,
  };
};
export const contextActions = {
  updateUserInfo,
  selectPack,
  addAddOn,
  removeAddOn,
  selectBillType,
};
