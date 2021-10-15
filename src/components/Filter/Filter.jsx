import s from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <label className={s.label}>
      Find contact by name
      <input
        type="text"
        value={value}
        onChange={onChangeFilter}
        className={s.input}
      />
    </label>
  );
};

export default Filter;
