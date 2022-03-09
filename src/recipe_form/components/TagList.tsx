import Input from '../../common/components/Input';
import { Tag } from '../../recipe/store/RecipeTypes';

export interface ITagListProps {
  name:   string;
  label:  string;
  tooltip?: string;

  tags: Array<Tag>;
  errors?:  string;

  className?: string;
  onChange: (name: string, value: unknown) => void;
}

function stringify(value: Array<Tag>): string {
  return value.map(tag => tag.title).join(', ');
}

function arrayify(value: string): Array<Tag> {
  const dict: Array<Tag> = [];

  const tagsArray = value.split(',');
  tagsArray.forEach(title => {
    // TODO This seems hackish, as the id will be lost.
    dict.push({ title: title.trim() } as Tag);
  });

  return dict;
}

const TagList: React.FC<ITagListProps> = ({
    name, label, tooltip,
    tags, errors, className, onChange }: ITagListProps) => {
  const handleChange = (inpName: string, value: string) => {
    onChange(inpName, arrayify(value));
  };

  return (
    <Input
        name      = {name}
        label     = {label}
        tooltip   = {tooltip}
        value     = {stringify(tags)}
        errors    = {errors}
        className = {className}
        change    = {handleChange}
    />
  );
};

export default TagList;
