package fitnessproject.ivaniasnig.diet;

import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class DayDiet {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(cascade = CascadeType.ALL)
    private Meal breakfast;

    @ManyToOne(cascade = CascadeType.ALL)
    private Meal morningSnack;

    @ManyToOne(cascade = CascadeType.ALL)
    private Meal lunch;

    @ManyToOne(cascade = CascadeType.ALL)
    private Meal afternoonSnack;

    @ManyToOne(cascade = CascadeType.ALL)
    private Meal dinner;

    private String dayName;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diet_id")
    private Diet diet;

	public DayDiet(Meal breakfast, Meal morningSnack, Meal lunch, Meal afternoonSnack, Meal dinner, String dayName) {

		this.breakfast = breakfast;
		this.morningSnack = morningSnack;
		this.lunch = lunch;
		this.afternoonSnack = afternoonSnack;
		this.dinner = dinner;
		this.dayName = dayName;
	}  

}
