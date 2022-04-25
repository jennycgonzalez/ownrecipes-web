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
  const tagsArray = value.split(',');
  const dict: Array<Tag> = tagsArray
      .filter(title => title.trim().length > 0)
      .map(title => (
        // OPT This seems hackish, as the id is lost.
         ({ title: title.trim() } as Tag)
      ));

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
        onChange  = {handleChange}
    />
  );
};

export default TagList;
