package fitnessproject.ivaniasnig.food;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "foods")
@Getter
@Setter
@NoArgsConstructor
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "food_category")
    private String foodCategory;
    
    @Column(name = "food_item")
    private String foodItem;
    
    @Column(name = "per_100grams")
    private String per100grams;
    
    @Column(name = "cals_per100grams")
    private String calsPer100grams;
    
    @Column(name = "kj_per100grams")
    private String kjPer100grams;

	public Food(String foodCategory, String foodItem, String per100grams, String calsPer100grams,
			String kjPer100grams) {
		
		this.foodCategory = foodCategory;
		this.foodItem = foodItem;
		this.per100grams = per100grams;
		this.calsPer100grams = calsPer100grams;
		this.kjPer100grams = kjPer100grams;
	}
    
    
}

