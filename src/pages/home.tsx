import {Button, Card, CardBody, Checkbox, Divider, Input, Switch, cn} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import Step from "@components/multi-step-form/steps";
import {
  Provider,
  contextActions,
  useDispatchContext,
  useReadContext,
} from "@components/multi-step-form/context";
import Validator from "@lib/functions/validators";

function Home() {
  const [step, setStep] = useState<number>(0);

  const forward: onStepChangeType = () => {
    setStep((state) => state + 1);
  };
  const backward: onStepChangeType = (step) => {
    if (step) {
      setStep(step);
    } else {
      setStep((state) => state - 1);
    }
  };
  return (
    <section className=" flex  items-center justify-center py-10 bg-sky-100 w-screen h-screen">
      <Card className="w-[70vw] max-w-[1000px]  bg-white  rounded-xl shadow-blue-800">
        <CardBody>
          <section className=" grid grid-cols-12 p-2 gap-10 min-h-[500px]">
            <aside className="col-span-3 flex flex-col gap-5 bg-secondary-50/20 p-3 rounded-xl">
              <Step title="Your Info" num={1} active={step === 0} />
              <Step title="Select Plan" num={2} active={step === 1} />
              <Step title="Add-ons" num={3} active={step === 2} />
              <Step title="Summary" num={4} active={step === 3} />
            </aside>
            <main className="col-span-9 ">
              <Provider>
                {Boolean(step === 0) && <Step1 key="Step-1" onNext={forward} />}
                {Boolean(step === 1) && <Step2 key="Step-2" onNext={forward} onBack={backward} />}
                {Boolean(step === 2) && <Step3 key="Step-3" onNext={forward} onBack={backward} />}
                {Boolean(step === 3) && (
                  <Summary key="Summary" onNext={forward} onBack={backward} />
                )}
                {Boolean(step === 4) && <EndFarewall key="Farewall" />}
              </Provider>
            </main>
          </section>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;

type onStepChangeType = (step?: number) => undefined;
interface StepScreenType {
  onNext: onStepChangeType;
  onBack: onStepChangeType;
}

const EndFarewall = () => {
  return (
    <section className="p-10 text-center flex flex-col items-center justify-center h-full">
      <h1 className="font-bold text-gray-800 text-3xl">Thank you!</h1>
      <p className="text-gray-500 mt-3">
        Thanks for confirming your subscription! We hope you have fun using our platform. If you
        ever need support, please feel free to email us at support@kanjaki.com
      </p>
    </section>
  );
};
const Summary: React.FC<StepScreenType> = ({onNext, onBack}) => {
  const data = useReadContext();
  const {cartInfo, pack, isYearly, addOns} = data;
  const [total, setTotal] = useState(0);
  const fullBillType = isYearly ? "Yearly" : "Monthly";
  const shortBillType = isYearly ? "yr" : "mo";
  const packData = cartInfo.packs[pack];
  const addOnsData = cartInfo.addOns.filter((_, index) => addOns.includes(index));

  useEffect(() => {
    const packPrice = isYearly ? packData.subscription.yearly : packData.subscription.monthly;
    const addOnPrice = addOnsData.reduce((acc, curr) => {
      if (isYearly) {
        acc += curr.subscription.yearly;
      } else {
        acc += curr.subscription.monthly;
      }

      return acc;
    }, 0);

    setTotal(packPrice + addOnPrice);
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800">Finishing up</h1>
      <p className="text-lg  text-gray-400">Double-check everything looks OK before confirming.</p>

      <main className="bg-primary-50/50 p-2 rounded mt-10 mb-5 mx-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-700">
              {packData.title} ({fullBillType})
            </h3>
            <p
              className="underline text-sm text-primary-300 cursor-pointer"
              onClick={() => onBack(1)}
            >
              Change
            </p>
          </div>
          <p className="text-lg font-bold text-gray-700">
            ${isYearly ? packData.subscription.yearly : packData.subscription.monthly}/
            {shortBillType}
          </p>
        </div>
        <Divider className="my-4" />
        {addOnsData.map((addOn) => (
          <div className="flex justify-between items-center" key={addOn.id}>
            <p className="text-gray-400">{addOn.title}</p>
            <p className="font-medium text-gray-700">
              +${isYearly ? addOn.subscription.yearly : addOn.subscription.monthly}/{shortBillType}
            </p>
          </div>
        ))}
      </main>
      <div className="flex justify-between py-2 px-4 mb-10">
        <p className="text-gray-400">Total (per {isYearly ? "year" : "month"})</p>
        <p className="text-xl font-bold text-primary-500">
          ${total}/{shortBillType}
        </p>
      </div>
      <footer className="flex justify-between">
        <Button
          color="default"
          radius="sm"
          variant="light"
          onClick={() => onBack()}
          data-cy="step-4-back-btn"
        >
          Go Back
        </Button>{" "}
        <Button color="secondary" radius="sm" onClick={() => onNext()} data-cy="step-4-confirm-btn">
          Confirm
        </Button>
      </footer>
    </>
  );
};

const Step3: React.FC<StepScreenType> = ({onNext, onBack}) => {
  const dispatch = useDispatchContext();
  const data = useReadContext();
  const {addOns, cartInfo, isYearly} = data;

  const [selectedAddOns, setSelectedAddOns] = useState(new Set<number>());

  function handleChange(index: number) {
    if (selectedAddOns.has(index)) {
      setSelectedAddOns((state) => {
        state.delete(index);

        return new Set([...state]);
      });
    } else {
      setSelectedAddOns((state) => {
        state.add(index);
        return new Set([...state]);
      });
    }
  }

  function handleSubmit() {
    onNext();
    if (dispatch) {
      dispatch(contextActions.addAddOn([...selectedAddOns]));
    }
  }

  useEffect(() => {
    setSelectedAddOns(new Set(addOns));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800">Pick add-ons</h1>
      <p className="text-lg  text-gray-400">Add-ons help enhance your gaming experience.</p>
      <section className="my-10 ">
        <main className="flex flex-col gap-6">
          {cartInfo.addOns.map((addOn, index) => (
            <Checkbox
              name={`${addOn.id}-${index}`}
              key={addOn.id}
              isSelected={selectedAddOns.has(index)}
              onChange={() => handleChange(index)}
              classNames={{
                label: "w-full",
                base: cn(
                  "inline-flex w-full max-w-3xl ",
                  "hover:bg-content2 items-center justify-start",
                  "cursor-pointer rounded-lg gap-2 p-4 border-1 ",
                  "data-[selected=true]:border-primary",
                  "data-[selected=true]:bg-primary-50",
                ),
              }}
              data-cy={`add-on-${addOn.id}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-primary-500 font-semibold text-xl">{addOn.title}</h3>
                  <p>{addOn.description}</p>
                </div>
                <p>
                  {isYearly
                    ? `$${addOn.subscription.yearly}/yr`
                    : `$${addOn.subscription.monthly}/mo`}
                </p>
              </div>
            </Checkbox>
          ))}
        </main>
      </section>
      <footer className="flex justify-between">
        <Button
          color="default"
          radius="sm"
          variant="light"
          onClick={() => onBack()}
          data-cy="step-3-back-btn"
        >
          Go Back
        </Button>{" "}
        <Button color="primary" radius="sm" onClick={handleSubmit} data-cy="step-3-next-btn">
          Next Step
        </Button>
      </footer>
    </>
  );
};
const Step2: React.FC<StepScreenType> = ({onNext, onBack}) => {
  const dispatch = useDispatchContext();
  const data = useReadContext();
  const {cartInfo, pack, isYearly} = data;

  const [isYearlySubscribed, setIsYearlySubscribed] = useState(true);
  const [selectedPacksKey, setSelectedPackKey] = useState(0);

  function handleSubmit() {
    onNext();
    if (dispatch) {
      dispatch(contextActions.selectPack(selectedPacksKey));
      dispatch(contextActions.selectBillType(isYearlySubscribed));
    }
  }

  useEffect(() => {
    setSelectedPackKey(pack);
    setIsYearlySubscribed(isYearly);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800">Select your plan</h1>
      <p className="text-lg  text-gray-400">You have the option of monthly or yearly billing.</p>
      <section className="my-10 ">
        <main className="flex justify-around ">
          {cartInfo.packs.map((plan, index) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPackKey(index)}
              data-cy={`pack-${plan.id}`}
            >
              <Card
                isBlurred
                className={`bg-primary-50/20 w-36 h-32 cursor-pointer border-1 border-transparent ${
                  selectedPacksKey === index
                    ? "border-primary-500 bg-primary-50/40"
                    : "hover:border-primary-400"
                }`}
                shadow="sm"
              >
                <CardBody>
                  <h3 className="text-primary-700 font-semibold text-xl">{plan.title}</h3>
                  <p>
                    {isYearlySubscribed
                      ? `$${plan.subscription.yearly}/yr`
                      : `$${plan.subscription.monthly}/mo`}
                  </p>
                  {isYearlySubscribed ? (
                    <p className="mt-auto text-primary-400">2 month free</p>
                  ) : (
                    ""
                  )}
                </CardBody>
              </Card>
            </div>
          ))}
        </main>

        <section className="my-10">
          <div className="flex items-center justify-center gap-4 bg-primary-50/30 w-11/12 mx-auto p-2 rounded-md">
            <p
              className={`${
                isYearlySubscribed ? " text-gray-400" : "text-primary-500"
              } font-medium`}
            >
              Monthly
            </p>
            <Switch
              isSelected={isYearlySubscribed}
              onValueChange={setIsYearlySubscribed}
              data-cy="bill-type-switch"
            />
            <p
              className={`${isYearlySubscribed ? "text-primary-500" : "text-gray-400"} font-medium`}
            >
              Yearly
            </p>
          </div>
        </section>
      </section>
      <footer className="flex justify-between">
        <Button
          color="default"
          radius="sm"
          variant="light"
          onClick={() => onBack()}
          data-cy="step-2-back-btn"
        >
          Go Back
        </Button>{" "}
        <Button color="primary" radius="sm" onClick={handleSubmit} data-cy="step-2-next-btn">
          Next Step
        </Button>
      </footer>
    </>
  );
};
const Step1: React.FC<Pick<StepScreenType, "onNext">> = ({onNext}) => {
  const data = useReadContext();
  const dispatch = useDispatchContext();
  const [userInfo, setUserInfo] = useState({
    name: {value: "", error: false},
    email: {value: "", error: false},
    phone: {value: "", error: false},
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    const validate = new Validator(value);
    const error = {
      email: validate.email(),
      phone: validate.phone(),
      name: validate.name(),
    };

    setUserInfo((state) => ({
      ...state,
      [name]: {value, error: !error[name as "email" | "phone" | "name"]},
    }));
  }

  function handleSubmit() {
    if (!userInfo.name.value || !userInfo.phone.value || !userInfo.email.value) {
      setUserInfo((state) => ({
        email: {...state.email, error: !state.email.value},
        name: {...state.name, error: !state.name.value},
        phone: {...state.phone, error: !state.phone.value},
      }));
    }

    if (
      userInfo.name.value &&
      userInfo.phone.value &&
      userInfo.email.value &&
      !userInfo.phone.error &&
      !userInfo.email.error &&
      !userInfo.name.error
    ) {
      onNext();
      if (dispatch) {
        dispatch(
          contextActions.updateUserInfo({
            name: userInfo.name.value,
            email: userInfo.email.value,
            phone: userInfo.phone.value,
          }),
        );
      }
    }
  }

  useEffect(() => {
    if (data) {
      const {
        userInfo: {email, phone, name},
      } = data;
      setUserInfo({
        email: {value: email, error: false},
        phone: {value: phone, error: false},
        name: {value: name, error: false},
      });
    }
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800">Personal info</h1>
      <p className="text-lg  text-gray-400">
        Please provide your name, email address, and phone number
      </p>
      <div className="flex flex-col gap-5 my-10">
        <Input
          type="text"
          label="Name"
          name="name"
          labelPlacement="outside"
          placeholder="e.g. Stephen King"
          variant="bordered"
          radius="sm"
          color={userInfo.name.error ? "danger" : "primary"}
          value={userInfo.name.value}
          onChange={handleChange}
          errorMessage={
            userInfo.name.error
              ? !userInfo.name.value
                ? "Please fill the field"
                : "Invalid input"
              : ""
          }
          data-cy="name-input"
        />{" "}
        <Input
          type="email"
          label="Email Address"
          name="email"
          labelPlacement="outside"
          placeholder="e.g. stephenking@lorem.com"
          variant="bordered"
          radius="sm"
          color={userInfo.email.error ? "danger" : "primary"}
          value={userInfo.email.value}
          onChange={handleChange}
          errorMessage={
            userInfo.email.error
              ? !userInfo.email.value
                ? "Please fill the field"
                : "Invalid input"
              : ""
          }
          data-cy="email-input"
        />
        <Input
          type="number"
          label="Phone Number"
          name="phone"
          labelPlacement="outside"
          placeholder="e.g. 954 678 9989"
          variant="bordered"
          radius="sm"
          color={userInfo.phone.error ? "danger" : "primary"}
          value={userInfo.phone.value}
          onChange={handleChange}
          errorMessage={
            userInfo.phone.error
              ? !userInfo.phone.value
                ? "Please fill the field"
                : "Invalid input"
              : ""
          }
          data-cy="phone-input"
        />
      </div>
      <footer className="flex justify-end">
        <Button color="primary" radius="sm" onClick={handleSubmit} data-cy="step-1-next-btn">
          Next Step
        </Button>
      </footer>
    </>
  );
};
