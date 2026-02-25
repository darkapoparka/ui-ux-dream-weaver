interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const CategoryChip = ({ label, active = false, onClick, icon }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground shadow-glow"
          : "bg-card text-secondary-foreground border border-border hover:border-primary/30 hover:bg-primary/5"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default CategoryChip;
