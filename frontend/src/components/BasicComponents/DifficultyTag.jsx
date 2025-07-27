const DifficultyTag = ({ difficulty }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-700';
      case 'intermediate':
        return 'bg-yellow-700';
      case 'advanced':
        return 'bg-red-700';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span className={`${getDifficultyColor(difficulty)} text-white text-xs px-3 py-1 rounded-full mb-4 select-none`}>
      {difficulty}
    </span>
  );
};

export default DifficultyTag;