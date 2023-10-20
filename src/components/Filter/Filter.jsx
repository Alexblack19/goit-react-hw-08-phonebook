import { Input, Label, Span } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { getFilter } from '../../redux/selectors';

export function Filter() {
  const dispatch = useDispatch();

  const valueFilter = useSelector(getFilter);

  const onChangeFilter = e => {
    dispatch(setFilter(e.currentTarget.value.trim()));
  };

  return (
    <Label>
      <Span> Find contacts by name </Span>
      <Input
        placeholder="Search"
        type="text"
        value={valueFilter}
        onChange={onChangeFilter}
      />
    </Label>
  );
}
