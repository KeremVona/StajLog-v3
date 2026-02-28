const WelcomeCard: React.FC<{
  name: string;
  time: string;
  isMessage?: boolean;
  colorClass: string;
  btnColor: string;
}> = ({ name, time, isMessage, colorClass, btnColor }) => (
  <div
    className={`${colorClass} border rounded-xl ${isMessage ? "w-5/12" : "w-7/12"} p-6 bg-no-repeat bg-right`}
  >
    <p className="text-5xl text-indigo-900">
      {isMessage ? "Inbox" : "Welcome"} <br />
      <strong className="font-bold">
        {name === "Inbox" ? "" : name} {isMessage ? time : ""}
      </strong>
    </p>
    {isMessage ? (
      <a
        href="#"
        className={`${btnColor} text-xl text-white underline hover:no-underline inline-block rounded-full mt-12 px-8 py-2 font-bold`}
      >
        See messages
      </a>
    ) : (
      <span
        className={`${btnColor} text-xl text-white inline-block rounded-full mt-12 px-8 py-2 font-bold`}
      >
        {time}
      </span>
    )}
  </div>
);

export default WelcomeCard;
