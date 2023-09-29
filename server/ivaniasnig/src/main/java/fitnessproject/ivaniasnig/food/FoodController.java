package fitnessproject.ivaniasnig.food;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;
    
    @GetMapping
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }
}
