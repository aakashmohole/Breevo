import InterviewCard from "./InterviewCard";

const InterviewList = ({ interviews, onJoin, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onJoin={onJoin}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default InterviewList;

