package fitnessproject.ivaniasnig.customtable;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CustomEntry {
	
	@Id
	@GeneratedValue
	private UUID id;
	private String entryName;
	private int entryValue;
	

    @ManyToOne
    @JoinColumn(name="table_id")
    @JsonIgnore
    private CustomTable table;

	public CustomEntry(String entryName, int entryValue, CustomTable table) {
		this.entryName = entryName;
		this.entryValue = entryValue;
		this.table = table;
	}
	
}
