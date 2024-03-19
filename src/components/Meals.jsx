// 导入MealItem组件
import MealItem from './MealItem.jsx';
// 导入自定义钩子useHttp
import useHttp from '../hooks/useHttp.js';
// 导入Error组件，用于显示错误信息
import Error from './Error.jsx';

// 请求配置，目前为空对象，可根据需要进行配置
const requestConfig = {};

// 定义Meals组件
export default function Meals() {
    // 使用自定义的HTTP钩子获取数据，传入请求地址和配置
    const {
        data: loaloadedMeals, // 加载的餐点数据,
        isLoading, // 是否正在加载数据的标志
        error, // 错误信息
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    // 如果数据正在加载中，则显示加载提示
    if (isLoading) {
        return <p className='center'>Fetching meals...</p>;
    }

    // 如果加载过程中发生错误，显示错误信息
    if (error) {
        return <Error title="Failed to fetch meals" message={error} />;
    }

    // 数据加载成功后，渲染餐点列表
    // 遍历loadedMeals数组，为每个餐点创建一个MealItem组件
    // key为每个餐点唯一的id，用于React列表渲染的性能优化
    return (
        <ul id="meals">
            {loaloadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}