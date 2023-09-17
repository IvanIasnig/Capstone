package fitnessproject.ivaniasnig.customtable;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import fitnessproject.ivaniasnig.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CustomTable {

	@Id
	@GeneratedValue
	private UUID id;
	private String tableName;
	
	@ManyToOne
	@JsonIgnore
	private User user;
	
    @OneToMany(mappedBy = "table", cascade = CascadeType.ALL)
    private List<CustomEntry> entries = new ArrayList<>();

    public CustomTable(String tableName, User user, List<CustomEntry> entries) {
		this.tableName = tableName;
		this.user = user;
		this.entries = entries;
	}
	   
} 
