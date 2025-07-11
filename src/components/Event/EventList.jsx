/**
 * @param {{ eventos: import("../../models/Event").Event[], onSelect: function }} props
 */
export default function EventList({ eventos, onSelect }) {
    return (
      <ul>
        {eventos.map((ev) => (
          <li key={ev.id} onClick={() => onSelect(ev.id)}>
            <strong>{ev.name}</strong> — {ev.start_date}
          </li>
        ))}
      </ul>
    );
  }