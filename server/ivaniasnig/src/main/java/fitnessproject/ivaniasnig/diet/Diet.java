package fitnessproject.ivaniasnig.diet;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import fitnessproject.ivaniasnig.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Diet {
	
	@GeneratedValue
	@Id
	private UUID id;
	
    @OneToOne(mappedBy = "diet")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "diet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DayDiet> dayDiets = new ArrayList<>();

	public Diet(User user, List<DayDiet> dayDiets) {
		this.user = user;
		this.dayDiets = dayDiets;
	}

    
}
