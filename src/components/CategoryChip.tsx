interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryChip = ({ label, active = false, onClick }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
        active
          ? "bg-foreground text-background"
          : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
      }`}
    >
      {label}
    </button>
  );
};

export default CategoryChip;
